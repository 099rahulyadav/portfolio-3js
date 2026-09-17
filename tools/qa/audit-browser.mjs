import { chromium } from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'msedge',headless:true,args:['--enable-unsafe-swiftshader']});
const results=[];
for(const route of ['/about','/projects','/achievements','/projects/lead-unity','/projects/one-pick','/projects/chessy','/projects/claster','/projects/one-tele','/projects/career-logic-ai']){
 const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];const failed=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(r.url()+':'+r.status())});
 await page.goto('http://127.0.0.1:3001'+route,{waitUntil:'networkidle'});await page.waitForTimeout(1600);
 await page.screenshot({path:'test-results/'+route.slice(1).replaceAll('/','-')+'.png'});
 const result={route,title:await page.title(),text:(await page.locator('body').innerText()).slice(0,120),errors,failed,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),buttons:await page.getByRole('button').allTextContents()};results.push(result);console.log(JSON.stringify(result));await page.close();
}
const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:3001/',{waitUntil:'networkidle'});await page.waitForTimeout(3000);await page.screenshot({path:'test-results/mobile-home.png'});
await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('link',{name:'Projects',exact:true}).filter({visible:true}).click();await page.waitForURL('**/projects');await page.waitForTimeout(1500);await page.screenshot({path:'test-results/mobile-projects.png'});console.log('MOBILE',JSON.stringify({errors,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1)}));
fs.writeFileSync('test-results/route-audit.json',JSON.stringify(results,null,2));await browser.close();

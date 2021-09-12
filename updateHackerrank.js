//npm i puppeteer 
const { rejects } = require("assert");
const { Console } = require("console");
const {answers} = require("./code");

let puppeteer=require("puppeteer");
// const codesObj = require("./code");
//step1 it will be create a headless brower
console.log(answers);
let browserStartPromise=puppeteer.launch({
//browser visible
headless:false,
defaultViewport:null,
//setting here we put some cromimum settings ex to maximize the brower
args:["--start-maximized","--disable-notifications"]

});
let page,browser,rTab;
//promise provider allways gives you an object


(async function(){
    try{let browserObj=await browserStartPromise;
        let newTab=await browserObj.newPage();
        page=newTab;
       await newTab.goto("https://www.hackerrank.com/auth/login");
      await page.type("input[id='input-1']","raspusorde@yevme.com");
    await page.type("input[type='password']","@Allout17");
    await page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await waitAndSelect('[data-automation="algorithms"]',page);
    await waitAndSelect('input[value="warmup"]',page);
    await page.waitFor(3000);
    let arraySol=await page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{ delay: 100 });
     await questionAnswerPromise(page,arraySol[0],answers[0]);
    }catch (err) {
        console.log(err);
    }
    
})()
    














function waitAndSelect(selector,cpage){
return new Promise(function(resolve,reject){
let promiseClone=cpage.waitForSelector(selector,{visible:true});
promiseClone.then(function(){
let clickClone=cpage.click(selector,{delay:100})
return clickClone
}).then(function(){
    resolve();
}).then(function(){

    reject();
})


})

}
     function questionAnswerPromise(page,question,answers){
        return new Promise(function(resolve,reject){
            //here we click on number of solution
            let qPromise=question.click();
        qPromise.then(function(){

            let getEditerSelectforFocus=waitAndSelect(".monaco-editor.no-user-select.vs",page)
          return getEditerSelectforFocus
        }).then(function(){

let clickOnCheckBox=waitAndSelect(".checkbox-input",page);
return clickOnCheckBox
        }).then(function(){
let writeCodeOnInputEditers=page.waitForSelector("textarea.custominput",{visible:true});
return writeCodeOnInputEditers;

        }).then(function(){

            return page.type("textarea.custominput",answers,{delay:30});
        }).then(function(){

            let pressCtrl=page.keyboard.down("Control",{delay:100});
            return pressCtrl;
 })
 
 
 .then(function(){
            let pressA=page.keyboard.press("A",{delay:100});
return pressA
        }).then(function(){
            let pressX=page.keyboard.press("X",{delay:100});
            return pressX
        }).then(function(){
            let liftUpFromCtrl=page.keyboard.up("Control");
            return liftUpFromCtrl
            
        })
        
        
        .then(function () {
            // focus 
            let waitFOrEditorToBeInFocus =
                waitAndSelect(".monaco-editor.no-user-select.vs", page);
            return waitFOrEditorToBeInFocus;
        })
        .then(function(){

            let pressCtrl=page.keyboard.down("Control",{delay:100});
            return pressCtrl;
 }).then(function(){
            let pressA=page.keyboard.press("A",{delay:100});
return pressA
        })


        .then(function () {
            let AIsPressedP = page.keyboard.press("V", { delay: 100 });
            return AIsPressedP;
        }).then(function () {
            let ctrlIsPressedP = page.keyboard.up("Control");
            return ctrlIsPressedP;
        }).then(function () {
            return page.click(".hr-monaco__run-code", { delay: 50 });
        })
        .then(function () {
            resolve();
        }).catch(function (err) {
            console.log(err)
            reject(err);
        })
})
        
}      
        
        
        
        
        
        
        
   
        
        
        
        
//         })
        
//         }



        
         
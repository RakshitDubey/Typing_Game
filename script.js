const url='https://api.quotable.io/random'
const quotedisplayelement=document.getElementById('quote-display')
const quoteinputelement=document.getElementById('quoteinput')
const timerele=document.getElementById('timer')
let correct=true

quoteinputelement.addEventListener('input',()=>{
    const arrayquote=quotedisplayelement.querySelectorAll('span')
    const arrayvalue=quoteinputelement.value.split("")
    arrayquote.forEach((characterspan,index)=>{

        const character=arrayvalue[index]
        if(character==null){
            characterspan.classList.remove("correct")
            characterspan.classList.remove("incorrect")
            correct=false

        }
        else if(character===characterspan.innerText){
            characterspan.classList.add("correct")
            characterspan.classList.remove("incorrect")
        }
        else{
            characterspan.classList.remove("correct")
            characterspan.classList.add("incorrect")

            correct=false
        }


    })
    if(correct){
        getnextquote(

        )
        
    }
})
function Quote(){

    return fetch(url)
    .then(resposne=>resposne.json())
    .then(data=>data.content)

}

async function getnextquote(){
    const quote=await Quote()
    console.log(quote);
    quotedisplayelement.innerHTML=''
    quote.split('').forEach(element => {
        const characterspan=document.createElement('span')
       
        characterspan.innerText=element
        quotedisplayelement.appendChild(characterspan)
        
    });
    quoteinputelement.value=null
    starttimer()
    
}
let startime;
function starttimer(){
    timerele.innerText=0
    startime=new Date()
    setInterval(()=>{
       timerele.innerText=gettimertime()

    },1000)
}

function gettimertime(){/'const timer=document.getElementById('timer')'
    return Math.floor((new Date()-startime)/1000)
}

getnextquote()
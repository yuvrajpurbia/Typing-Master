const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button');

//set value
let timer;
let maxTime= 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake =0;
let isTyping = false;


function loadParagraph(){
    const paragraph= [
        "The quick brown fox jumps over the lazy dog multiple times to impress the crowd. Everyone watched in awe as the agile fox performed incredible feats, showcasing its dexterity and speed in a mesmerizing display.",
        "Pack my box with five dozen liquor jugs and quickly deliver them to the party. The guests eagerly await the refreshing beverages, excited to enjoy the evening with their favorite drinks in hand and good company.",
        "Sphinx of black quartz, judge my vow as I pledge to conquer new challenges every day. This mantra motivates me to push my limits, embrace growth, and strive for excellence in every aspect of my life, no matter the obstacles.",
        "How razorback-jumping frogs can level six piqued gymnasts remains a mystery. These amphibians exhibit extraordinary abilities, leaving spectators baffled and amazed at their unexpected and astonishing talents in the arena.",
        "The five boxing wizards jump quickly, casting spells with remarkable precision. Their synchronized movements and magical prowess create an enchanting spectacle that captivates audiences and leaves them spellbound and exhilarated.",
        "Bright vixens jump dozy fowl quack in the tranquil meadow. The serene scene is a testament to nature's beauty, where creatures of all kinds coexist in harmony, creating a peaceful and picturesque environment for all to enjoy.",
        "Jackdaws love my big sphinx of quartz, often perched atop its majestic form. These birds find solace in the towering structure, their presence adding to the mystical allure of the ancient and enigmatic stone guardian that stands watch.",
        "Quick brown foxes jump over lazy dogs in a playful chase, their energy and enthusiasm infectious. This lively interaction between the animals brings joy and laughter to onlookers, showcasing the carefree spirit of youth and adventure.",
        "Heavy boxes perform quick waltzes and jigs, defying expectations with their grace. This whimsical imagery reminds us that even the most unlikely objects can surprise us with their hidden potential, encouraging us to look beyond appearances.",
        "Jinxed wizards pluck ivy from the big quilt in a bid to break the curse. Their determined efforts and unwavering resolve inspire hope and perseverance, demonstrating that even in the face of adversity, there's always a chance for redemption.",
        "Beneath the starlit sky, the campfire crackled and glowed, casting flickering shadows on the faces of friends gathered around. Stories of adventure and mystery filled the night air, weaving a tapestry of memories that would be cherished for years to come.",
        "The garden was a riot of color, with blooming flowers swaying gently in the breeze. Butterflies danced from petal to petal, their delicate wings shimmering in the sunlight. It was a peaceful haven, a retreat from the chaos of the outside world.",
        "In the heart of the forest, a hidden waterfall cascaded into a crystal-clear pool. The sound of rushing water was a soothing melody, harmonizing with the chirping of birds and the rustling of leaves, creating a symphony of nature's own making.",
        "In a quaint village, cobblestone streets wound between charming cottages with flower-filled gardens. The aroma of freshly baked bread wafted from the bakery, inviting passersby to stop and enjoy the simple pleasures of life in a close-knit community.",
        "The bustling market was alive with vibrant colors and sounds. Stalls overflowed with fresh produce, handmade crafts, and exotic spices. Vendors called out their wares, and shoppers haggled with friendly banter, creating a lively and dynamic atmosphere.",
        "On the snowy mountain peak, the world seemed untouched and pristine. The crisp air was invigorating, and the panoramic view was breathtaking. Each step through the powdery snow brought a sense of adventure and awe at nature's grandeur.",
        "The bustling café was filled with the aroma of freshly brewed coffee. Conversations buzzed around cozy tables, and the barista expertly crafted each drink. It was a place of warmth and connection, where friendships were nurtured and stories shared.",
        "In the desert, the vast expanse of sand dunes stretched endlessly. The heat shimmered in the distance, creating mirages that danced on the horizon. Despite the harsh conditions, the beauty of the desert landscape was captivating and mysterious.",
        "The bustling city park was an oasis of green amidst the concrete jungle. Families picnicked on the grass, children played on the swings, and joggers circled the paths. The sounds of laughter and nature blended harmoniously, creating a lively retreat.",
        "In the art gallery, each piece told a unique story. Paintings, sculptures, and photographs adorned the walls, capturing moments of beauty, sorrow, and joy. Visitors moved slowly, taking in the creativity and expression that filled the space.",
        "At the farmer's market, stalls were laden with fresh fruits, vegetables, and homemade goods. The vibrant colors and rich scents were a feast for the senses. Local farmers and artisans proudly displayed their products, creating a community hub of activity.",
        "The old lighthouse stood proudly on the cliff, its beacon guiding ships safely to shore. The sound of waves crashing against the rocks was a constant, powerful reminder of the sea's might. It was a symbol of hope and safety for sailors navigating the coast.",
        "In the theater, the audience waited in anticipation as the lights dimmed and the curtain rose. The actors' performances were captivating, bringing stories to life with passion and skill. Each scene was a testament to the magic of live performance."


];

const randomIndex = Math.floor(Math.random()*paragraph.length);
typingText.innerHTML='';
for(const char of paragraph[randomIndex]){
console.log(char);
typingText.innerHTML+= `<span>${char}</span>`;
}
typingText.querySelectorAll('span')[0].classList.add('active');
document.addEventListener('keydown',()=>input.focus());
typingText.addEventListener("click",()=>{
    input.focus()})
}

//Handle user input
function initTyping(){
    const char= typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft >0){

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping=true;
        }

        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            console.log("correct");
        }
        else{
            mistake++ ;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');

        mistakes.innerText = mistake;
        cpm.innerText = charIndex- mistake;
    }
    else{
clearInterval(timer);
input.value='';
    }
}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5) /(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText= timeLeft;
    input.value='';
    charIndex = 0;
    mistake =0;
    isTyping = false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}


input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();
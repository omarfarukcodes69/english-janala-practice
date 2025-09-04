

console.log("i am omar faruk")
const allLavelAPI = `https://openapi.programming-hero.com/api/levels/all`;
const loadLessons = () => {
    fetch(allLavelAPI)
        .then(res => res.json())
        .then(json => displyLessons(json.data))
}
const loadLavelWords = (id) => {
    const wordUrl = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(wordUrl)
        .then(res => res.json())
        .then(json => displayLevalWords(json.data));
}
const displayLevalWords = (words) => {
    const wordsContainer = document.getElementById("words-container");
    wordsContainer.innerHTML = "";
    // ----------- empty lesson massege ------------
    if (words.length == 0) {
        wordsContainer.innerHTML = `
                <div class="random-text text-center col-span-3">
                    <i class="fa-solid fa-triangle-exclamation text-[100px] text-red-500 pb-3"></i>
                      <p class=" text-sm text-gray-400 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                     <h1 class="text-4xl font-bold pt-3 font-bangla">নেক্সট Lesson এ যান</h1>
                </div>
        `;
        return
    }


    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
                <div class="card bg-[#fff] text-center py-10 px-5 w-full shadow-xl">
                    <h1 class="text-2xl font-bold  ">${word.word}</h1>
                    <p class="text-sm py-3">meaning/Pronounciation</p>
                    <h2 class="text-2xl font-semibold ">${word.meaning}/${word.pronunciation}</h2>
                    <div class="icons text-2xl flex justify-between items-center mt-14">
                        <a href="" class="bg-[#E8F4FF] p-2 rounded-md"><i class="fa-solid fa-circle-info"></i></a>
                        <a href="#" class=" bg-[#E8F4FF] p-2 rounded-md"> <i class="fa-solid fa-volume-high"></i></a>

                    </div>
                </div>
        `;
        wordsContainer.appendChild(card)
    })
}




const displyLessons = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";
    for (const lesson of lessons) {
        const lessonCard = document.createElement("div");
        lessonCard.innerHTML = `
                        <button onclick="loadLavelWords(${lesson.level_no})" class="btn btn-outline btn-primary" href=""><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
    `
        lessonContainer.appendChild(lessonCard);
        // console.log(lessons)

    }
}

loadLessons()
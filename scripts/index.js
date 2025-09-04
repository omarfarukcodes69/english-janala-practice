
const allLavelAPI = `https://openapi.programming-hero.com/api/levels/all`;
const loadLessons = () => {
    fetch(allLavelAPI)
        .then(res => res.json())
        .then(json => displyLessons(json.data))
}
const createElement = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
}

const manageSppiner = (status) => {
    if (status == true) {
        document.getElementById("sppiner").classList.remove("hidden");
        document.getElementById("words-container").classList.add("hidden");
    } else {
        document.getElementById("words-container" ).classList.remove("hidden");
        document.getElementById("sppiner").classList.add("hidden");
    }
};
const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn");
    lessonBtn.forEach(btn => btn.classList.remove("active"))
}
const loadLavelWords = (id) => {
    manageSppiner(true)
    const wordUrl = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(wordUrl)
        .then(res => res.json())
        .then(json => {
            removeActive();
            const clickLessonBtn = document.getElementById(`lesson-btn-${id}`);
            clickLessonBtn.classList.add("active");
            displayLevalWords(json.data);
        });

}

const loadWordDetails = async (id) => {
    const wordDetailsURL = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(wordDetailsURL);
    const details = await res.json();
    displayWordDetails(details.data);
}
const displayWordDetails = (word) => {
    const modalContainer = document.getElementById("details-container");
    modalContainer.innerHTML = `
               <div class="px-5 border-2 border-[#EDF7FF] rounded-md space-y-5 py-5">
                <h1 class=" text-3xl font-bold">${word.word} <span><i class="fa-solid fa-microphone"></i>:</span>
                     <span class="font-bangla">${word.pronunciation}</span>
                </h1>
                <div class="text-2xl  space-y-2">
                <h1 class=" font-bold">Meaning</h1>
                 <h3 class="font-bangla font-semibold">${word.meaning}</h3>
            </div>
            <div class="text-2xl space-y-2">
             <h1 class="font-bold">Example</h1>
              <p class="">${word.sentence}</p>
            </div>
        <div class="synomins space-y-4  ">
            <h1 class="text-3xl font-bangla font-bold ">সমার্থক শব্দ গুলো</h1>
            <div class="flex gap-4 flex-wrap">
                <div> ${createElement(word.synonyms)}</div>
            </div>
        </div>
    </div>
    `;
    document.getElementById("info_modal").showModal()
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
        manageSppiner(false)
        return
    }
    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
                <div class="card bg-[#fff] text-center py-10 px-5 w-full shadow-xl">
                    <h1 class="text-2xl font-bold  ">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h1>
                    <p class="text-sm py-3">meaning/Pronounciation</p>
                    <h2 class="text-2xl font-semibold ">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</h2>
                    <div class="icons text-2xl flex justify-between items-center mt-14">
                        <button onclick="loadWordDetails(${word.id})" class="bg-[#E8F4FF] p-2 rounded-md"><i class="fa-solid fa-circle-info"></i></button>
                        <button href="#" class=" bg-[#E8F4FF] p-2 rounded-md"> <i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
        `;
        wordsContainer.appendChild(card)
    })
    manageSppiner(false)
}

const displyLessons = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = " ";
    for (const lesson of lessons) {
        const lessonCard = document.createElement("div");
        lessonCard.innerHTML = `
                        <button id="lesson-btn-${lesson.level_no}" onclick="loadLavelWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn" href=""><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
    `
        lessonContainer.appendChild(lessonCard);
        // console.log(lessons)

    }
}

loadLessons()
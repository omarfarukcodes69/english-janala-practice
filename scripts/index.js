

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
    words.forEach(word => {
        console.log(word);
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
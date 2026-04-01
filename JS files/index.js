const createElement = (array) =>{
    const htmlElement = array.map((el) => `<span class='btn'>${el}</span>`);
    return htmlElement.join(' ');
}

const manageSpinner = (status) =>{
  if(status == true){
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('wordContainer').classList.add('hidden');
  }
  else{
    document.getElementById('wordContainer').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
}

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => displayLevels(data.data));
};

const removeActive = () => {
  const btnActive = document.querySelectorAll(".btnActive");
  btnActive.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const loadWordLevel = (id) => {
  manageSpinner(true)
  const url = fetch(`https://openapi.programming-hero.com/api/level/${id}`);
  url
    .then((response) => response.json())
    .then((data) => {
      removeActive();
      const activeBtn = document.getElementById(`lessonBtn${id}`);
      activeBtn.classList.add("active");
      displayWord(data.data);
    });
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const response = await fetch(url);
  const details = await response.json();
  displayWordDetails(details.data);
};


const displayWordDetails = (word) => {
  console.log(word);
  
  const detailsBox = document.getElementById("detailsBox");
  detailsBox.innerHTML = `
  <div class="border p-4 rounded-md space-y-6">
        <div>
            <h2 class="text-4xl font-bold hind-siliguri">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
        </div>

        <div>
            <p class="text-xl font-semibold">Meaning</p>
            <p class="">${word.meaning}</p>
        </div>

        <div>
            <p class="text-xl font-semibold">Example</p>
            <p>${word.sentence}</p>
        </div>

        <div>
            <p class="text-xl font-semibold hind-siliguri">সমার্থক শব্দ গুলো</p>
            <div>
              ${createElement(word.synonyms)}
            </div>
        </div>
  </div>
  <div class="modal-action">
      <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
      </form>
  </div>
  `;
  document.getElementById("my_modal_5").showModal();
};

const displayWord = (words) => {
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
      <div class="text-center col-span-full space-y-4 py-4">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-normal text-gray-500 hind-siliguri">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p class="text-4xl font-semibold hind-siliguri">নেক্সট Lesson এ যান।</p>
      </div>
      `;
  }

  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = `
        <div class="wordCard bg-white p-8 text-center rounded-md h-[100%] space-y-5">
                <h1 class="text-2xl font-bold">${word.word ? word.word : "শব্দ খুজে পাওয়া যায়নি"}</h1>
                <p class="text-xl mb-8">Meaning /Pronunciation</p>
                <h3 class="hind-siliguri text-xl font-semibold opacity-80">"${word.meaning ? word.meaning : "অর্থ খুজে পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation খুজে পাওয়া যায়নি"}"</h3>
                <div class="flex justify-between items-center pb-4">
                    <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF30]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF30]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `;

    wordContainer.append(wordCard);
  });
  manageSpinner(false);
};

const displayLevels = (lessons) => {
  const lessonContainer = document.getElementById("lessonContainer");
  lessonContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `
    <btn id='lessonBtn${lesson.level_no}' onclick="loadWordLevel(${lesson.level_no})" class="btn btn-outline btn-primary btnActive">
    <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</btn>
    `;

    lessonContainer.append(lessonBtn);
  });
};

loadLessons();



const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => displayLevels(data.data));
};

const displayLevels = (lessons) => {
  const lessonContainer = document.getElementById("lessonContainer");
  lessonContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    console.log(lesson);

    const lessonBtn = document.createElement("div");
    lessonBtn.innerHTML = `
    <btn class="btn btn-outline btn-primary">
    <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</btn>
    `;

    lessonContainer.append(lessonBtn);
  });
};

loadLessons();

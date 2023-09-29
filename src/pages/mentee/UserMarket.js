import React, { useContext } from "react";
import CoursePresentation from "../../components/CoursePresentation";
import style from "../../styles/mentee/UserMarket.module.css";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";

function UserMarket() {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setUser({
      classes: [
        {
          name_of_class: "Fizica",
          name_of_mentor: "Andreea",
        },
        {
          name_of_class: "Info",
          name_of_mentor: "Valeriu",
        },
        {
          name_of_class: "Java",
          name_of_mentor: "Flavius",
        },
        {
          name_of_class: "C#",
          name_of_mentor: "Smeurica",
        },
        {
          name_of_class: "C++",
          name_of_mentor: "Miss Zurini",
        },
      ],
      username: "Toma Cristian",
      coursesList: [
        {
          videos: [
            {
              url: "https://youtu.be/shOZcaQyS_k?si=NQ__zREsW1rwSarg",
              title: "jbkdresvf",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
          ],
          pdfs: "vedem noi",
          title: "Curs de agatat cu Silviu Faiar",
        },
        {
          videos: [
            {
              url: "https://youtu.be/shOZcaQyS_k?si=NQ__zREsW1rwSarg",
              title: "jbkdresvf",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
            {
              url: "https://youtu.be/hmj2cd3qLdw?si=3J8ERH_H_zQ9kHIb",
              title: "rfef",
            },
          ],
          pdfs: "vedem noi",
          title: "Curs de agatat cu Silviu Faiar",
        },
      ],
    });
  }, []);

  const courses = [
    {
      id: 0,
      title: "Curse de agatat cu Silviu Faiar",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description: "cel mai bomba curs de agatat",
    },
    {
      id: 1,
      title: "Curse de agatat cu Andreea Constantin",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description: "cel mai bomba curs de agatat",
    },
    {
      id: 2,
      title: "Curse de agatat cu Elena Cravan",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description: "cel mai bomba curs de agatat",
    },
    {
      id: 3,
      title: "Curse de agatat cu Antonia Scafaru",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description: "cel mai bomba curs de agatat",
    },
    {
      id: 4,
      title: "Curse de agatat cu Elena Cravan",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description: "cel mai bomba curs de agatat",
    },
    {
      id: 5,
      title: "Curse de agatat cu Antonia Scafaru",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description: "cel mai bomba curs de agatat",
    },
    {
      id: 6,
      title: "Curse de agatat cu Elena Cravan",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description: "cel mai bomba curs de agatat",
    },
    {
      id: 7,
      title: "Curse de agatat cu Antonia Scafaru",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description:
        "cel mai bomba curs de agatat55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555",
    },
    {
      id: 8,
      title: "Curse de agatat cu Elena Caravan",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description: "cel mai bomba curs de agatat",
    },
    {
      id: 9,
      title: "Curse de agatat cu Antonia Scafaru",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description: "cel mai bomba curs de agatat",
    },
  ];

  return (
    <div className={style.mainContainer}>
      <h1>Couses</h1>
      <div className={style.coursesArea}>
        {courses.map((c) => {
          return (
            <div key={c.id}>
              <CoursePresentation
                id={c.id}
                title={c.title}
                image={c.image}
                description={c.description}
              ></CoursePresentation>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserMarket;

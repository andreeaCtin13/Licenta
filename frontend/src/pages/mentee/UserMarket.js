import React, { useContext } from "react";
import CoursePresentation from "../../components/mentee/CoursePresentation";
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
      title: "NodeJS Class",
      image:
        "https://community-cdn-digitalocean-com.global.ssl.fastly.net/xBpq9VZXB14EAbstuFd3sKpQ",
      description: "cel mai bomba curs",
    },
    {
      id: 1,
      title: "React Router",
      image:
        "https://www.freecodecamp.org/news/content/images/size/w2000/2021/06/reactrouter.png",
      description: "cel mai bomba curs",
    },
    {
      id: 2,
      title: "React Mobile",
      image:
        "https://codersera.com/blog/wp-content/uploads/2019/02/react-native.png",
      description: "cel mai bomba curs",
    },
    {
      id: 3,
      title: "Java Class",
      image:
        "https://th.bing.com/th/id/R.68670ace943fc4aa368d57d87c181c43?rik=ZeMxdfNZyBElOg&riu=http%3a%2f%2f4.bp.blogspot.com%2f-qgz6PpapmZQ%2fU2wuHR-1-3I%2fAAAAAAAAAkc%2f4Y77VAKuwr0%2fs1600%2fJavaFx%2bLogo.png&ehk=bO%2bF2R8za3GjRT5V29u19cyFP6TE9d0lozAA1cvWlDA%3d&risl=&pid=ImgRaw&r=0",
      description: "cel mai bomba curs",
    },
    {
      id: 4,
      title: "C# Mastery",
      image: "https://miro.medium.com/max/1024/1*uhSX5djhrWiguXoWsW_lEw.png",
      description: "cel mai bomba curs",
    },
    {
      id: 5,
      title: "MySQL",
      image:
        "https://th.bing.com/th/id/R.6b47d7fec15d3e1a5de086ac1c808f6d?rik=IIkC39481Md3Bw&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f05%2fMySQL_logo_logotype.png&ehk=aWHquyoObU%2fXSsDiw7VKaqGdBCxP2cRjipdNUO5Q6us%3d&risl=&pid=ImgRaw&r=0",
      description: "cel mai bomba curs",
    },
    {
      id: 6,
      title: "SQLite",
      image:
        "https://th.bing.com/th/id/R.fdd5ec35ee1a5957de5ec18b8ea8de4b?rik=ies9k4tQC4T%2fsg&riu=http%3a%2f%2ftechoh.net%2fwp-content%2fuploads%2fsqlite-logo.png&ehk=FxFafACVMSH9vakQZuOOXOlPCBXQW6KOB4nhYpfkx90%3d&risl=&pid=ImgRaw&r=0",
      description: "cel mai bomba curs",
    },
    {
      id: 7,
      title: "Android",
      image:
        "https://th.bing.com/th/id/OIP.cFtcYJOj98eapEIimVqxnAHaEc?pid=ImgDet&rs=1",
      description: "cel mai bomba curs",
    },
    {
      id: 8,
      title: "C++",
      image:
        "https://www.educative.io/api/page/5393602882568192/image/download/6038586442907648",
      description: "cel mai bomba curs",
    },
    {
      id: 9,
      title: "C Embedded",
      image:
        "https://www.extremetech.com/wp-content/uploads/2019/08/Embedded-C-Programming-3.jpg",
      description: "cel mai bomba curs de agatat",
    },
  ];

  return (
    <div className={style.mainContainer}>
      <h1>Courses</h1>
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

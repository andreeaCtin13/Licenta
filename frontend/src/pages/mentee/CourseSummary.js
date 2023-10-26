import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import style from "../../styles/mentee/CourseSummary.module.css";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import currentUser from "../../data/user.json";
import Button from "../../components/Button";

function CourseSummary() {
  const { idCourse } = useParams();
  const [requestStatus, setRequestStatus] = useState("Enroll");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(currentUser);
  }, []);

  const courses = [
    {
      id: 0,
      title: "NodeJS Class",
      image:
        "https://community-cdn-digitalocean-com.global.ssl.fastly.net/xBpq9VZXB14EAbstuFd3sKpQ",
      description: "cel mai bomba curs",
      sectiuni: [
        {
          id: 31,
          titluSectiune: "Cum sa abordez in club?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 30,
          titluSectiune: "Cum sa abordez in Mamaia?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 29,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "notRequested",
    },
    {
      id: 1,
      title: "React Router",
      image:
        "https://www.freecodecamp.org/news/content/images/size/w2000/2021/06/reactrouter.png",
      description: "cel mai bomba curs",
      sectiuni: [
        {
          id: 28,
          titluSectiune: "Cum sa abordez in club?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 27,
          titluSectiune: "Cum sa abordez in Mamaia?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 26,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "notRequested",
    },
    {
      id: 2,
      title: "React Mobile",
      image:
        "https://codersera.com/blog/wp-content/uploads/2019/02/react-native.png",
      description: "cel mai bomba curs",
      sectiuni: [
        {
          id: 25,
          titluSectiune: "Cum sa abordez in club?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 24,
          titluSectiune: "Cum sa abordez in Mamaia?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 23,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "pending",
    },
    {
      id: 3,
      title: "Java Class",
      image:
        "https://th.bing.com/th/id/R.68670ace943fc4aa368d57d87c181c43?rik=ZeMxdfNZyBElOg&riu=http%3a%2f%2f4.bp.blogspot.com%2f-qgz6PpapmZQ%2fU2wuHR-1-3I%2fAAAAAAAAAkc%2f4Y77VAKuwr0%2fs1600%2fJavaFx%2bLogo.png&ehk=bO%2bF2R8za3GjRT5V29u19cyFP6TE9d0lozAA1cvWlDA%3d&risl=&pid=ImgRaw&r=0",
      description: "cel mai bomba curs",
      sectiuni: [
        {
          id: 22,
          titluSectiune: "Cum sa abordez in club?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 21,
          titluSectiune: "Cum sa abordez in Mamaia?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 20,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "pending",
    },
    {
      id: 4,
      title: "C# Mastery",
      image: "https://miro.medium.com/max/1024/1*uhSX5djhrWiguXoWsW_lEw.png",
      description: "cel mai bomba curs",
      sectiuni: [
        {
          id: 17,
          titluSectiune: "Cum sa abordez in club?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 18,
          titluSectiune: "Cum sa abordez in Mamaia?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 19,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "enrolled",
    },
    {
      id: 5,
      title: "MySQL",
      image:
        "https://th.bing.com/th/id/R.6b47d7fec15d3e1a5de086ac1c808f6d?rik=IIkC39481Md3Bw&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f05%2fMySQL_logo_logotype.png&ehk=aWHquyoObU%2fXSsDiw7VKaqGdBCxP2cRjipdNUO5Q6us%3d&risl=&pid=ImgRaw&r=0",
      description: "cel mai bomba curs",
      sectiuni: [
        {
          id: 14,
          titluSectiune: "Cum sa abordez in club?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 15,
          titluSectiune: "Cum sa abordez in Mamaia?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 16,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "enrolled",
    },
    {
      id: 6,
      title: "SQLite",
      image:
        "https://th.bing.com/th/id/R.fdd5ec35ee1a5957de5ec18b8ea8de4b?rik=ies9k4tQC4T%2fsg&riu=http%3a%2f%2ftechoh.net%2fwp-content%2fuploads%2fsqlite-logo.png&ehk=FxFafACVMSH9vakQZuOOXOlPCBXQW6KOB4nhYpfkx90%3d&risl=&pid=ImgRaw&r=0",
      description: "cel mai bomba curs",
      sectiuni: [
        {
          id: 10,
          titluSectiune: "Cum sa abordez in club?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 12,
          titluSectiune: "Cum sa abordez in Mamaia?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 11,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "enrolled",
    },
    {
      id: 7,
      title: "Android",
      image:
        "https://th.bing.com/th/id/OIP.cFtcYJOj98eapEIimVqxnAHaEc?pid=ImgDet&rs=1",
      description: "cel mai bomba curs",
      sectiuni: [
        {
          id: 7,
          titluSectiune: "Cum sa abordez in club?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 8,
          titluSectiune: "Cum sa abordez in Mamaia?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 9,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "enrolled",
    },
    {
      id: 8,
      title: "C++",
      image:
        "https://www.educative.io/api/page/5393602882568192/image/download/6038586442907648",
      description: "cel mai bomba curs",
      sectiuni: [
        {
          id: 4,
          titluSectiune: "Cum sa abordez in club?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 5,
          titluSectiune: "Cum sa abordez in Mamaia?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 6,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "enrolled",
    },
    {
      id: 9,
      title: "C Embedded",
      image:
        "https://www.extremetech.com/wp-content/uploads/2019/08/Embedded-C-Programming-3.jpg",
      description: "cel mai bomba curs de agatat",
      sectiuni: [
        {
          id: 3,
          titluSectiune: "Cum sa abordez in club?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 2,
          titluSectiune: "Cum sa abordez in Mamaia?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
        {
          id: 1,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "enrolled",
    },
  ];
  const chosenCourse = courses[idCourse];
  const { title, image, description, sectiuni, status } = chosenCourse;

  //TO DO: CAND AI BAZA DE DATE TREBUIE SA FACI FUNCTIA ASINCRONA PANA AJUNGI SA AI RASPUNSUL DE LA MENTOR, DACA E PRIMIT SAU NU IN CADRUL CURSULUI
  const handleEnroll = () => {
    setRequestStatus("pending");

    setTimeout(() => {
      setRequestStatus(requestStatus === "enroll" ? "unenroll" : "enroll");
    }, 2000);
  };

  return (
    <div className={style.mainContainer}>
      <h1>{title}</h1>
      <div className={style.flexContainer}>
        <div className={style.leftContainer}>
          <img src={image} alt="" className={style.courseImage} />
        </div>
        <div className={style.rightContainer}>
          <h2>Why to enroll to this course?</h2>
          <div className={style.rightContainerDesc}>{description}</div>
          <Button
            className={`${style.btn} ${
              requestStatus == "enroll"
                ? style.enrollBtn
                : requestStatus === "pending"
                ? style.pendingBtn
                : style.unEnrollBtn
            }`}
            onClick={handleEnroll}
            content={requestStatus}
          ></Button>
        </div>
      </div>
      <div className={style.accordion}>
        <Accordion activeIndex={0}>
          {sectiuni.map((s, index) => {
            return (
              <AccordionTab
                key={index}
                header={s.titluSectiune}
                className={style.accordionRow}
              >
                <p className={`m=0 accordionDescription`}>{s.descriere}</p>
              </AccordionTab>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

export default CourseSummary;

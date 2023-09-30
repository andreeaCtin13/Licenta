import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import style from "../../styles/mentee/CourseSummary.module.css";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import currentUser from "../../data/user.json";

function CourseSummary() {
  const { idCourse } = useParams();
  const [requestStatus, setRequestStatus] = useState("Enroll");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(currentUser);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Curse de agatat cu Silviu Faiar",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description: "cel mai bomba curs de agatat",
      sectiuni: [
        {
          id: 1,
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
          id: 3,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "notRequested",
    },
    {
      id: 2,
      title: "Curse de agatat cu Andreea Constantin",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
      sectiuni: [
        {
          id: 1,
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
          id: 3,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "notRequested",
    },
    {
      id: 3,
      title: "Curse de agatat cu Elena Cravan",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
      sectiuni: [
        {
          id: 1,
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
          id: 3,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "pending",
    },
    {
      id: 4,
      title: "Curse de agatat cu Antonia Scafaru",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
      sectiuni: [
        {
          id: 1,
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
          id: 3,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "pending",
    },
    {
      id: 3,
      title: "Curse de agatat cu Elena Cravan",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
      sectiuni: [
        {
          id: 1,
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
          id: 3,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "enrolled",
    },
    {
      id: 4,
      title: "Curse de agatat cu Antonia Scafaru",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
      sectiuni: [
        {
          id: 1,
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
          id: 3,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "enrolled",
    },
    {
      id: 3,
      title: "Curse de agatat cu Elena Cravan",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
      sectiuni: [
        {
          id: 1,
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
          id: 3,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "enrolled",
    },
    {
      id: 4,
      title: "Curse de agatat cu Antonia Scafaru",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
      sectiuni: [
        {
          id: 1,
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
          id: 3,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "enrolled",
    },
    {
      id: 3,
      title:
        "Curse de agatat cu Elena Caaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaravan",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
      sectiuni: [
        {
          id: 1,
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
          id: 3,
          titluSectiune: "Cum sa abordez in Zanzibar?",
          descriere:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
        },
      ],
      status: "enrolled",
    },
    {
      id: 4,
      title: "Curse de agatat cu Antonia Scafaru",
      image:
        "https://banimarunti.ro/wp-content/uploads/2022/08/Faiar-Silviu.jpg",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus pulvinar elementum integer enim neque volutpat ac. A scelerisque purus semper eget duis. Tristique et egestas quis ipsum. Mus mauris vitae ultricies leo integer malesuada. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Feugiat in fermentum posuere urna nec tincidunt praesent semper feugiat. Magna etiam tempor orci eu. Feugiat in fermentum posuere urna nec. Convallis tellus id interdum velit laoreet id donec ultrices tincidunt. Enim nec dui nunc mattis enim ut. Fusce ut placerat orci nulla pellentesque. Adipiscing elit pellentesque habitant morbi tristique senectus et. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Aliquet risus feugiat in ante metus.",
      sectiuni: [
        {
          id: 1,
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
          id: 3,
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
          <button
            className={`${style.btn} ${
              requestStatus == "enroll"
                ? style.enrollBtn
                : requestStatus === "pending"
                ? style.pendingBtn
                : style.unEnrollBtn
            }`}
            onClick={handleEnroll}
          >
            {requestStatus}
          </button>
        </div>
      </div>
      <div className={style.accordion}>
        <Accordion activeIndex={0}>
          {sectiuni.map((s) => {
            return (
              <AccordionTab
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

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import style from "../../styles/mentee/Course.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import user from "../../data/user.json";

function CoursePage() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const { idCourse } = useParams();

  const playVideo = (index) => {
    setCurrentSectionIndex(index);
  };

  const courseChosen = user.classes[idCourse];

  return (
    <div className={style.mainContainer}>
      <h1> {courseChosen.name_of_class}</h1>
      <div className={style.mentor}>
        Mentored by {courseChosen.name_of_mentor}
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
        nobis? Consequuntur neque, iusto, distinctio numquam dolorem magnam non
        obcaecati eveniet nemo nulla eum sequi. Repellat adipisci vel reiciendis
        excepturi nostrum.
      </div>
      <h2>Video Resources</h2>
      <div className={style.containerVideo}>
        <div>
          <ReactPlayer
            url={courseChosen.sections[currentSectionIndex].video.url}
            controls
          />
        </div>
        <div className={style.videoPlaylistContainer}>
          {courseChosen.sections.map((section, index) => (
            <div
              className={`${style.videoPlaylistRow} ${
                index === currentSectionIndex ? style.selectedVideo : ""
              }`}
              onClick={() => playVideo(index)}
            >
              <h3 key={index} className={style.videoPlaylistRowTitle}>
                {section.video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className={style.containerPDFS}>
        <h2>PDF Resources</h2>
        <div className={style.pdfs}>
          {courseChosen.sections[currentSectionIndex].PDFList.map(
            (x, index) => {
              return (
                <button key={index} className={style.btnPDFS}>
                  <div>{x.title}</div>
                  <div>
                    <FontAwesomeIcon icon={faAnglesDown} />
                  </div>
                </button>
              );
            }
          )}
        </div>
      </div>

      <div className={style.containerAssigments}>
        <h2>Assigments</h2>
        {courseChosen.sections[currentSectionIndex].AssigmentsList.map(
          (x, index) => {
            return (
              <div className={style.assigment} key={index}>
                <h3>{x.titlu}</h3>
                <div className={style.assigmentRow}>
                  <div>{x.cerinta}</div>
                  <button className={style.assigmentBtn}>Upload</button>
                </div>
              </div>
            );
          }
        )}
      </div>

      <div className={style.containerTest}>
        <h2>VERIFICATION TEST</h2>
        <button className={style.testBtn}>
          <Link
            className={style.testBtnLink}
            to={`/test/${Number(idCourse)}/${currentSectionIndex}`}
          >
            Start
          </Link>
        </button>
      </div>
    </div>
  );
}

export default CoursePage;

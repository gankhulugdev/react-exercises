import React, { useState } from "react";
import Language from "./language";

const languages = [
  {
    code: "MN",
    src: "https://www.worldatlas.com/r/w425/img/flag/mn-flag.jpg"
  },
  {
    code: "GB",
    src: "https://www.worldatlas.com/r/w425/img/flag/uk-flag.jpg"
  },
  {
    code: "GR",
    src: "https://www.worldatlas.com/r/w425/img/flag/de-flag.jpg"
  },
  {
    code: "CH",
    src: "https://www.worldatlas.com/r/w425/img/flag/cn-flag.jpg"
  },
  {
    code: "KR",
    src: "https://www.worldatlas.com/r/w425/img/flag/kr-flag.jpg"
  },
  {
    code: "ES",
    src: "https://www.worldatlas.com/r/w425/img/flag/es-flag.jpg"
  },
  {
    code: "FR",
    src: "https://www.worldatlas.com/r/w425/img/flag/fr-flag.jpg"
  }
];

const LanguagePicker = () => {
  const [isShown, setIsShown] = useState(false);
  const [selectedLanguage, setLanguage] = useState("MN");

  const handleClick = () => {
    setIsShown((currentState) => !currentState);
  }

  return (
    <div className="languageContainer">
      {languages.map((language, idx) => {
        return (
          language.code === selectedLanguage && (
            <div onClick={handleClick}>
              <Language key={idx} className="selected"  language={language} />
            </div>
          )
        )
      })}

      {languages.map((language, idx) => {
        return (
          language.code !== selectedLanguage && isShown && (
            <div onClick={() => setLanguage(() => language.code)}>
              <Language key={idx} className="notSelected"  language={language} />
            </div>
          )
        )
      })}
    </div>
  );
};

export default LanguagePicker;

import React, { useState } from "react";
import Language from "./language";

const languages = [
  {
    code: "MN",
    src: "https://www.worldatlas.com/r/w425/img/flag/mn-flag.jpg",
  },
  {
    code: "GB",
    src: "https://www.worldatlas.com/r/w425/img/flag/uk-flag.jpg",
  },
  {
    code: "GR",
    src: "https://www.worldatlas.com/r/w425/img/flag/de-flag.jpg",
  },
  {
    code: "CH",
    src: "https://www.worldatlas.com/r/w425/img/flag/cn-flag.jpg",
  },
  {
    code: "KR",
    src: "https://www.worldatlas.com/r/w425/img/flag/kr-flag.jpg",
  },
  {
    code: "ES",
    src: "https://www.worldatlas.com/r/w425/img/flag/es-flag.jpg",
  },
  {
    code: "FR",
    src: "https://www.worldatlas.com/r/w425/img/flag/fr-flag.jpg",
  },
];

const LanguagePicker = () => {
  const [isShown, setIsShown] = useState(false);
  const [selectedLanguage, setLanguage] = useState(languages[0]);

  const handleClick = () => {
    setIsShown((currentState) => !currentState);
  };

  return (
    <div className="languageContainer">
      <div onClick={() => setIsShown((currentState) => !currentState)}>
        <Language className="selected" language={selectedLanguage} />
      </div>

      {languages
        .filter((language, idx) => language !== selectedLanguage && isShown)
        .map((language, idx) => (
          <div key={idx} onClick={() => setLanguage(() => language)}>
            <Language key={idx} className="notSelected" language={language} />
          </div>
        ))}
    </div>
  );
};

export default LanguagePicker;

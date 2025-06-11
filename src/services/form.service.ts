
export const isName = (e: any) => {
  const inputValue = e.target.value;
  const keyPressed = e.keyCode || e.which;
  // Check if the input exceeds 50 characters
  if (inputValue.length >= 51 && keyPressed !== 8 /* Backspace */) {
    e.preventDefault();
    return;
  }
  // Check if the entered character is valid (only alphabets and spaces)
  if (
    !(
      (
        keyPressed === 8 ||
        keyPressed === 9 ||
        keyPressed === 37 ||
        keyPressed === 39
      ) /* Backspace */
    ) &&
    !(
      (
        (keyPressed >= 65 && keyPressed <= 90) || // A-Z
        (keyPressed >= 97 && keyPressed <= 122) || // a-z
        keyPressed === 32
      ) // space
    )
  ) {
    e.preventDefault();
  }
};


export const isSubject = (e: any) => {
  const inputValue = e.target.value;

  // Allow arrow keys and tab without any validation
  if (
    ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"].includes(e.key)
  ) {
    return;
  }

  if (
    (inputValue.length >= 50 && e.key !== "Backspace") ||
    (inputValue.length === 0 && !/[A-Za-z0-9.'\séçü-]/.test(e.key)) ||
    (!/^[A-Za-z0-9.'\séçü-]$/.test(e.key) && e.key !== "Backspace")
  ) {
    e.preventDefault();
    return;
  }
};

export const isEmail = (e: any, maxLength: number) => {
  if (
    e.key === ">" ||
    e.key === "(" ||
    e.key === ")" ||
    e.key === "!" ||
    e.key === "#" ||
    e.key === "$" ||
    e.key === "%" ||
    e.key === "^" ||
    e.key === "&" ||
    e.key === "*" ||
    e.key === "_" ||
    e.key === "-" ||
    e.keyCode === 32 ||
    e.keyCode === 186 ||
    e.keyCode === 187 ||
    e.keyCode === 188 ||
    e.keyCode === 191 ||
    e.keyCode === 192 ||
    e.keyCode === 219 ||
    e.keyCode === 220 ||
    e.keyCode === 221 ||
    e.keyCode === 222
  ) {
    e.preventDefault();
  }
  if (e.key !== "Backspace" && e.target.value.length === maxLength) {
    e.preventDefault();
  }
};


export const isPassword = (e: any, onChange: any) => {
  // Get the current input value
  const inputValue = e.target.value;

  // Check if the input includes a space and the key pressed is not the backspace key
  if (inputValue.includes(" ") && e.key !== "Backspace") {
    e.preventDefault();
    return;
  }

  // Check if the input exceeds 20 characters and the key pressed is not the backspace key
  if (inputValue.length >= 20 && e.key !== "Backspace") {
    e.preventDefault();
    return;
  }
};

export const isConfirmPass = (e: any, onChange: any) => {
  // Get the current input value
  const inputValue = e.target.value;

  // Check if the input exceeds 50 characters
  if (inputValue.length >= 21 && e.key !== "Backspace") {
    e.preventDefault();
    return;
  }
};

export const isZipcode = (e: any) => {
  if (!/^[0-9]$|^Backspace$/.test(e.key)) {
    e.preventDefault();
  }
  // Check if the current input value length exceeds 12 characters
  if (e.target.value.length >= 11 && e.key !== "Backspace") {
    e.preventDefault();
  }
};



export const isToken = (e: any, onChange: any) => {
  const input = e.target.value;
  const isNumericKey = /^\d$/;

  if (!isNumericKey.test(e.key) && e.key !== "Backspace") {
    e.preventDefault();
  }

  if (input === "0" && e.key !== "Backspace") {
    e.preventDefault();
  }
};


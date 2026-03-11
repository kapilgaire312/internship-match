class CustomError extends Error {
  constructor(message, code) {
    //call the Error()
    super(message);

    //adding more function like error.code and error.name
    this.code = code;
    this.name = "CustomError";
  }
}
export default CustomError;

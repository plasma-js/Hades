class ValidationError extends Error {
  constructor(err) {
    super(err.message);
    this.errors = err.errors;
    this.params = err.params;
    this.value = err.value;
  }
};

export default ValidationError;
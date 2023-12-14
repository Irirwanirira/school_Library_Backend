export const  formatResponse = (
    res,
    statusCode,
    data=undefined,
    message = undefined,
    options = {}
) => {
    res.status(statusCode);
    const response = {
        message,
        data: data || undefined
    };

    if(options.include){
        response.include = options.include;
    }

  if (options.order) {
    response.order = options.order;
  }
  res.json(response);
}

export const formatError = (res, statusCode, errorMessage) => {
    res.status(statusCode);
    res.json({
        error: errorMessage
    });
};

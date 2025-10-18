function formatResponse(res, status, data) {
  return res.status(status).json(data);
}

export default formatResponse;

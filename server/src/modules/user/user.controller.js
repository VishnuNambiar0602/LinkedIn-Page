import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/responseUtils.js";
import { userService } from "./user.service.js";

const userLogin = errorWrapper(async (req, res) => {
  const data = await userService.userLogin(req.body);

  return responseUtils.success(res, {
    data,
    status: 200,
  });
});

export { userLogin };

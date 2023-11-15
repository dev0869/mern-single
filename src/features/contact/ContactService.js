import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const postQuery = async (contactdata) => {

  const response = await axios.post(`${base_url}enquiry`,contactdata);

  return response.data;
};


const productService = {
  postQuery
 
};

export default productService;

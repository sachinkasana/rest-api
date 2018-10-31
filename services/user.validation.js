const Joi  = require('joi');

validator= {
  // POST /api/tasks
  register: {
    body: {
      username: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email:Joi.string().regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
      password:Joi.string().required()
    }
  },

  // GET/api/tasks/:taskId
  getUser: {
    params: {
      userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }
  },

  
};
 module.exports= validator;
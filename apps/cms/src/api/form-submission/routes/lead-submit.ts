export default {
  routes: [
    {
      method: 'POST',
      path: '/leads/submit',
      handler: 'form-submission.submit',
      config: {
        auth: false,
      },
    },
  ],
};

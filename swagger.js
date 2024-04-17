// Define the Swagger document in JavaScript format
export const swaggerDocument = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mailer",
      version: "1.0",
      description: "",
    },
    tags: [
      {name: "Jackpot", description: ""},
      {name: "Cruiserims", description: ""},
      {name: "Alphabode", description: ""},
    ],
    paths: {
      "/send-jackpot": {
        post: {
          tags: ["Jackpot"],
          summary: "Send mails",
          description: "This route is used to send",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    emails: {type: "string", default: ""},
                  },
                },
              },
            },
          },
          responses: {
            201: {description: "Message sent"},
            400: {description: "Error"},
          },
        },
      },

      //   "/test-jackpot": {
      //     post: {
      //       tags: ["Jackpot"],
      //       summary: "Send mails",
      //       description: "This route is used to send",
      //       requestBody: {
      //         required: true,
      //         content: {
      //           "application/json": {
      //             schema: {
      //               type: "object",
      //               properties: {
      //                 emails: {type: "array", default: [""]},
      //               },
      //             },
      //           },
      //         },
      //       },
      //       responses: {
      //         201: {description: "Message sent"},
      //         400: {description: "Error"},
      //       },
      //     },
      //   },

      "/send-cruise": {
        post: {
          tags: ["Cruiserims"],
          summary: "Send mails",
          description: "This route is used to send",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    emails: {type: "string", default: ""},
                  },
                },
              },
            },
          },
          responses: {
            201: {description: "Message sent"},
            400: {description: "Error"},
          },
        },
      },
    },
    servers: [
      {
        // url: "http://localhost:5000/",
        url: "https://mailing-jcu3.onrender.com/",
      },
    ],
  },
  apis: ["./*.js"],
};

module.exports = {
    rootDir: "./test",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    testEnvironment: "node",
    testMatch: [
      "**/?(*.)+(spec|test).[t]s?(x)",
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "json"],
    setupFilesAfterEnv: ["./setupTests.js"],
  };
  
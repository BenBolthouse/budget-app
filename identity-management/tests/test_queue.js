function generateTestQueueItems(template, test, cases) {
  const testQueue = cases.map((validCase) => {
    const testCase = template(validCase);
    return test(testCase);
  });
  return testQueue;
}

module.exports = { generateTestQueueItems };

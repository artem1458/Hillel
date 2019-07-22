function makePyramid(n) {
  for (let i = 1; i <= n; i++) {
    console.log(`${i}`.repeat(i));
  }
}

makePyramid(9);

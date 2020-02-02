import SystemCluster from "../SystemCluster";

describe("System Collection Class tests", () => {
  it("Creates N Systems on creation", () => {
    const testCluster1 = new SystemCluster(2);
    const testCluster2 = new SystemCluster(5);
    const testCluster3 = new SystemCluster(9);
    const testCluster4 = new SystemCluster(50);
    const testCluster5 = new SystemCluster(10000);

    expect(testCluster1.systems.length).toBe(2);
    expect(testCluster2.systems.length).toBe(5);
    expect(testCluster3.systems.length).toBe(9);
    expect(testCluster4.systems.length).toBe(50);
    expect(testCluster5.systems.length).toBe(10000);
  })

  it("linkSystems properly links 2 SystemClusters", () => {
    const testCluster1 = new SystemCluster(5);
    const testCluster2 = new SystemCluster(10);

    testCluster1.systems.forEach(system => {
      expect(system.pathways.length).toBe(0);
    })
    testCluster1.linkSystems(testCluster2);
    testCluster1.systems.forEach(system => {
      expect(system.pathways.length).not.toBe(0);
    })
  })
});
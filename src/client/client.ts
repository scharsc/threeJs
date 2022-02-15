import { AbApplication } from "./AbApplication";

const app = new AbApplication(document.body);
app.createRandomSpheres();
app.createRandomCylinders();
app.createRandomBounds();
app.createRandomBoundsCs();
app.createRandomCones();
app.createRandomPointCloud(100000, 0.05);
app.createRegions();
app.animate();

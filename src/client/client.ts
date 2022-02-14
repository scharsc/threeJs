import { AbApplication } from "./AbApplication";

const app = new AbApplication(document.body);
app.createRandomScene();
app.createRandomScene2();
app.createScene3();
app.createRandomPointCloud(100000, 0.05);
app.animate();

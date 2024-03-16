import fs from "fs";
import path from "path";

export default {
  name: "transform-manifest",
  writeBundle() {
    const manifestPath = path.resolve(
      process.cwd(),
      "../../wwwroot/blog",
      "manifest.json"
    );
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      const transformed = Object.entries(manifest).reduce(
        (acc, [key, value]) => {
          const newKey = value.file.split("/").pop().split(".")[0];
          acc[newKey] = value;
          return acc;
        },
        {}
      );
      fs.writeFileSync(manifestPath, JSON.stringify(transformed, null, 2));
    }
  },
};

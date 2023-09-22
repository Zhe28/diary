import { dump } from "js-yaml";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { getFiles } from "../generateSidebar";
import { Dirent } from "node:fs";

const years: Dirent[] = getFiles(resolve(".", "src"), [".vitepress", "public"]);

const features: { title: string; link: string }[] = [];

years.forEach((year: Dirent) => {
  const months: Dirent[] = getFiles(resolve(".", "src", year.name));
  let firstDay: Dirent = getFiles(resolve(".", "src", year.name, months[0].name), [], true)[0];

  features.push({
    title: `${year.name}年${months[0].name}月`,
    link: `/${year.name}/${months[0].name}/${firstDay.name.replace("md", "html")}`,
  });
});

console.log(features);
export function indexBuild() {
  let frontMatter: string = dump({
    layout: "home",
    hero: {
      name: "journal",
      text: "我的日记",
      image: `/note.png`,
      tagline: null,
      actions: [
        { theme: "brand", text: "你发现了罪恶的源泉", link: "/2023/4/9" },
        // {
        //   theme: "alt",
        //   text: "simple",
        //   link: "/2023/4/11",
        // },
      ],
    },
    features,
  });

  //   增加 隔断符号
  frontMatter = "---\n" + frontMatter + "---\n";
  writeFile(resolve(".", "src/index.md"), frontMatter).then((err) => {});
}

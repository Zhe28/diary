import { resolve, parse } from "node:path";
import { readdirSync, Dirent } from "node:fs";

interface journalConfigInterface {
  collapsed: boolean;
  text: string;
  items: { text: string; link: string }[];
}

const src: string = resolve(".", "src");
let sidebar: {} | [] = {};

const journalConfigs: journalConfigInterface[] = [];
const years: Dirent[] = getFiles(src, [".vitepress", "public"]);

// 遍历年获得月份
years.forEach((yearDirectory: Dirent) => {
  const months: Dirent[] = getFiles(resolve(src, yearDirectory.name));

  // 遍历月获得这个月所有的日记
  months.forEach((monthDirectory: Dirent) => {
    const days: Dirent[] = getFiles(
      resolve(src, yearDirectory.name, monthDirectory.name),
      [],
      true,
    );

    journalConfigs.push(generateJournalConfig(yearDirectory, monthDirectory, days));
  });

  sidebar[yearDirectory.name] = journalConfigs;
});

export { sidebar, getFiles };

/**
 * todo: 获取文件夹内部所有的文件夹
 * @param path 文件夹的路径
 * @param filters 是否过滤其中的某些文件夹
 * @param text 是否只显示 text 文档， 默认 false
 */
function getFiles(path: string, filters?: string[], text = false): Dirent[] {
  let files: Dirent[] = readdirSync(path, { withFileTypes: true });

  // 确定目标是文件夹还是文件，然后按照屏蔽词屏蔽相关的文件
  files = files.filter((directory) => (text ? !directory.isDirectory() : directory.isDirectory()));
  filters &&
    filters.forEach((filter: string) => {
      files = files.filter((directory: Dirent) => {
        return !(directory.name === filter);
      });
    });

  // 由于文件按照约定是进行日期管理 ，因此直接用上数字排序
  files.sort(
    (first, second) => parseInt(first.name.split(".")[0]) - parseInt(second.name.split(".")[0]),
  );
  return files;
}

/**
 * todo: 获取单个日记的配置信息
 * @param yearDirectory 年份目录的Dirent
 * @param monthDirectory 月份目录的Dirent
 * @param dayDirectory 日记数组
 */
function generateJournalConfig(
  yearDirectory: Dirent,
  monthDirectory: Dirent,
  dayDirectory: Dirent[],
): journalConfigInterface {
  return {
    collapsed: true,
    text: `${monthDirectory.name}月`,
    items: dayDirectory.map((journal: Dirent) => {
      return {
        text: `${yearDirectory.name}年${monthDirectory.name}月${parse(journal.name).name}日`,
        link: `/${yearDirectory.name}/${monthDirectory.name}/${journal.name}`,
      };
    }),
  };
}

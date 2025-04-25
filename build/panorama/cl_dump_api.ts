import { readDump, outputFile } from '../util';

/**
 * 提取cl_panorama_typescript_declarations内容并输出到文件
 * 过滤掉以 "No matches for" 和 "debug.description" 开头的行
 */
export function generateClDumpApi(): void {
  // 读取cl_panorama_typescript_declarations内容
  const tsDeclarationsContent = readDump('cl_panorama_typescript_declarations');
  
  // 过滤掉以 "No matches for" 和 "debug.description" 开头的行
  const filteredContent = tsDeclarationsContent
    .split('\n')
    .map(line => {
      if (line.trim().startsWith('No matches for') || line.trim().startsWith('debug.description')) {
        return '// ' + line; // 添加注释
      }
      return line;
    })
    .join('\n');
  
  // 输出到文件
  outputFile('panorama/cl_dump_api.d.ts', filteredContent);
  
  console.log('Generated cl_dump_api.d.ts with filtered content');
}

// 此文件作为模块导入，不需要自动执行
// 通过build/panorama/index.ts调用generateClDumpApi()函数
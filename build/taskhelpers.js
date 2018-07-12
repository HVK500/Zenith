const fs = require('fs');

module.exports = {
  requireRemapping: (config) => {
    return () => {
      const input = `${config.outDir}/${config.outFile}`;
      let content = fs.readFileSync(input, 'utf8');
      const regex = /(\".*\"\:\d{1,}(\,|)){1,}/g;
      let items;
      let moduleMap = [];

      while ((items = regex.exec(content)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (items.index === regex.lastIndex) regex.lastIndex++;

        items.forEach((match, groupIndex) => {
          if (groupIndex !== 0) return;
          const modulePaths = match.split(',');
          modulePaths.forEach((modulePath) => {
            moduleMap.push(JSON.parse(`{${modulePath}}`));
          });
        });
      }

      moduleMap.forEach((map) => {
        const path = Object.keys(map)[0];
        const replacementPath = `"${path.substring((path.lastIndexOf('/') + 1), path.length)}"`; // Final name to be applied to the content
        // const replacementPath = `"${path.substring((path.indexOf('/') + 1), path.length).replace(/\//g, '.')}"`; // Final name to be applied to the content
        const replacementFullPath = `${replacementPath}:${map[path]}`;
        const requirePath = `require\\(\\"${path.replace(/\./g, '\\.').replace(/\//g, '\\/')}\\"\\)`;
        const replacementRequirePath = `require(${replacementPath})`;

        // Replace the modules path with the new one
        content = content.replace(new RegExp(`"${path}":${map[path]}`, 'g'), replacementFullPath)
                          .replace(new RegExp(requirePath, 'g'), replacementRequirePath);
      });

      fs.writeFileSync(input, content);
    }
  }
}

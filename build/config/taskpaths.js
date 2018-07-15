module.exports = {
  del: [
    './dist',
    './.cache'
  ],
  parcal: {
    input: './Zenith/Zenith.ts'
  },
  tsDoc: {
    theme: 'minimal',
    //description: '', // TODO: create a json file that contains the description of the project
    input: './Zenith/Zenith.ts',
    output: './dist/doc'
  }
}

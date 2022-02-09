wordLength = 5
guessWordFilename = '3000EnglishWords.txt'
legalWordFilename = 'AllEnglishWords.txt'

guessFile = open('guessWords.js', 'w')
with open(guessWordFilename, 'r') as f:
    guessFile.write("let guessWords = [" + '\n')
    for line in f:
        word = line.strip().upper()
        if (len(word) == wordLength):
            guessFile.write("  \"" + word + "\"," + '\n')
    guessFile.write("];" + '\n')
    guessFile.write("export default guessWords;")
guessFile.close()

legalFile = open('legalWords.js', 'w')
with open(legalWordFilename, 'r') as f:
    legalFile.write("let legalWords = {" + '\n')
    for line in f:
        word = line.strip().upper()
        if (len(word) == wordLength):
            legalFile.write("  \"" + word + "\": true," + '\n')
    legalFile.write("};" + '\n')
    legalFile.write("export default legalWords;")
legalFile.close()

const NEW_LINE_SEPARATOR = '\r\n';
const SEPARATOR = ',';

const jsonToCSV = (jsonFile = [{}]) => {
    const json = jsonFile;
    const header = Object.keys(json[0])
    const replacer = (key, value) => value === null ? "" : value;
    const csv = [
        header.join(SEPARATOR),
        ...json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(SEPARATOR))
    ].join(NEW_LINE_SEPARATOR);
    return csv;
};

const csvToJson = csv => {
    const [firstLine, ...lines] = csv.split(NEW_LINE_SEPARATOR);

    const json = lines.map(line =>
        firstLine
            .split(SEPARATOR)
            .reduce(
                (pre, curr, index) => {
                    return {
                        ...pre,
                        [curr]: line.split(SEPARATOR).map(str => str.slice(1, -1))[index],
                    }
                },
                {}
            )
    );
    return json;
};

module.exports = {
    jsonToCSV,
    csvToJson
}
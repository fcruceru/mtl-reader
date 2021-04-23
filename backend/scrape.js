export function scrapeChapterList(series) {
    if (series !== 'martial-peak'){ throw new Error("Invalid series name")}; // TODO: Un-ghetto this

    return [
        {"index": 1, title: "Oogabooga1"},
        {"index": 2, title: "Oogabooga2"},
        {"index": 3, title: "Oogabooga3"},
        {"index": 4, title: "Oogabooga4"},
    ];
}
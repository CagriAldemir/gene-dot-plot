import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  geneMatrix: GeneData[][] = [[], []];
  lineList: Line[] = [];

  //#region Data
  gene1 =
    "CGAGTGACCCGGAGGTAGAAGCGAGGCCTGCTGTTTTCTCACCGCAGCCTCCTTCCTGTAGCCCGGTTGAGGAAGTGAATTTCGCTGACAGGGCTGGGTTCAGTGAGGGAGAGGCGAATAAAACATCTTCCACTGGGGGGACGAAAACAAATACAGCGAAAAGAATAAA";
  gene2 =
    "GGGCGGCGCGGCGCTGACCCGGAAGTTCACTCCTAAGCAACGGCGGAAGTGAAAGGGCCGCGGCCTGCCTCGGAAGGAGGGAGAGCGGAGCGGAGCGGACCGGGAGGCGCCGCCGTTGCCACCGCCCAGCGCAGCCCCGCCGAGCCGCCATGAGTGACCAGCAGCTGGATTGTGCCTTGGATTTGATGAGGCGTCTGCCTCCGCAGCAGATAGAGAAGAATC";
  //#endregion

  ngOnInit() {
    this.generateGeneMatrix();

    setTimeout(() => {
      this.addConnectors();
    }, 1000);
  }

  generateGeneMatrix() {
    for (let i = 0; i < this.gene1.length; i++) {
      this.geneMatrix[i] = [];
      for (let j = 0; j < this.gene2.length; j++) {
        let object: GeneData = {
          isEqual: this.gene1[i] == this.gene2[j],
          value: this.gene1[i] + " - " + this.gene2[j],
          id: i.toString() + "-" + j.toString()
        };
        this.geneMatrix[i][j] = object;
      }
    }
  }

  isOk(i: number, j: number) {
    const mainObject = this.geneMatrix[i][j];

    let corner1: GeneData,
      corner2: GeneData,
      corner3: GeneData,
      corner4: GeneData;

    try {
      corner1 = this.geneMatrix[i - 1][j - 1];
    } catch {}

    try {
      corner2 = this.geneMatrix[i - 1][j + 1];
    } catch {}

    try {
      corner3 = this.geneMatrix[i + 1][j - 1];
    } catch {}

    try {
      corner4 = this.geneMatrix[i + 1][j + 1];
    } catch {}

    if (mainObject.isEqual) {
      if (
        (corner1 && corner1.isEqual) ||
        (corner2 && corner2.isEqual) ||
        (corner3 && corner3.isEqual) ||
        (corner4 && corner4.isEqual)
      ) {
        return true;
      }
    }

    return false;
  }

  addConnectors() {
    for (let i = 0; i < this.geneMatrix.length; i++) {
      for (let j = 0; j < this.geneMatrix[i].length; j++) {
        const mainObject = this.geneMatrix[i][j];

        let corner1: GeneData,
          corner2: GeneData,
          corner3: GeneData,
          corner4: GeneData;

        try {
          corner1 = this.geneMatrix[i - 1][j - 1];
        } catch {}

        try {
          corner2 = this.geneMatrix[i - 1][j + 1];
        } catch {}

        try {
          corner3 = this.geneMatrix[i + 1][j - 1];
        } catch {}

        try {
          corner4 = this.geneMatrix[i + 1][j + 1];
        } catch {}

        let mainDOMRect = document
          .getElementById(mainObject.id)
          .getBoundingClientRect();

        const y1 = (mainDOMRect.top + mainDOMRect.bottom) / 2;
        const x1 = (mainDOMRect.right + mainDOMRect.left) / 2;

        if (mainObject.isEqual) {
          if (corner1 && corner1.isEqual) {
            let cornerDOMRect = document
              .getElementById(corner1.id)
              .getBoundingClientRect();

            const x2 = (cornerDOMRect.left + cornerDOMRect.right) / 2;
            const y2 = (cornerDOMRect.top + cornerDOMRect.bottom) / 2;

            this.lineList.push({
              x1: x1,
              x2: x2,
              y1: y1,
              y2: y2
            });
          }

          if (corner2 && corner2.isEqual) {
            let cornerDOMRect = document
              .getElementById(corner2.id)
              .getBoundingClientRect();

            const x2 = (cornerDOMRect.left + cornerDOMRect.right) / 2;
            const y2 = (cornerDOMRect.top + cornerDOMRect.bottom) / 2;

            this.lineList.push({
              x1: x1,
              x2: x2,
              y1: y1,
              y2: y2
            });
          }

          if (corner3 && corner3.isEqual) {
            let cornerDOMRect = document
              .getElementById(corner3.id)
              .getBoundingClientRect();

            const x2 = (cornerDOMRect.left + cornerDOMRect.right) / 2;
            const y2 = (cornerDOMRect.top + cornerDOMRect.bottom) / 2;

            this.lineList.push({
              x1: x1,
              x2: x2,
              y1: y1,
              y2: y2
            });
          }

          if (corner4 && corner4.isEqual) {
            let cornerDOMRect = document
              .getElementById(corner4.id)
              .getBoundingClientRect();

            const x2 = (cornerDOMRect.left + cornerDOMRect.right) / 2;
            const y2 = (cornerDOMRect.top + cornerDOMRect.bottom) / 2;

            this.lineList.push({
              x1: x1,
              x2: x2,
              y1: y1,
              y2: y2
            });
          }
        }
      }
    }
  }
}

interface GeneData {
  value: string;
  isEqual: boolean;
  id: string;
}

interface Line {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

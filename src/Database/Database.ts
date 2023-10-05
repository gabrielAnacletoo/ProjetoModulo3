import mongoose from "mongoose"

class DatabaseConfig {
  static initialize() {
    mongoose.connection.on("open", () => {
      console.log("                        .,,uod8B8bou,,.");
      console.log("              ..,uod8BBBBBBBBBBBBBBBBRPFT?l!i:.");
      console.log("         ,=m8BBBBBBBBBBBBBBBRPFT?!||||||||||||||");
      console.log("         !...:!TVBBBRPFT||||||||||!!^^\"'    ||||");
      console.log("         !.......:!?|||||!!^^\"'             ||||");
      console.log("         !.........||||                     ||||");
      console.log("         !.........||||  #connected         ||||");
      console.log("         !.........||||                     ||||");
      console.log("         !.........||||                     ||||");
      console.log("         !.........||||                     ||||");
      console.log("         !.........||||                     ||||");
      console.log("         `.........||||                    ,||||");
      console.log("          .;.......||||               _.-!!|||||");
      console.log("   .,uodWBBBBb.....||||       _.-!!|||||||||!':");
      console.log("!YBBBBBBBBBBBBBBb..!|||:..-!!|||||||!iof68BBBBBb....");
      console.log("!..YBBBBBBBBBBBBBBb!!||||||||!iof68BBBBBBRPFT?!::   `.");
      console.log("!....YBBBBBBBBBBBBBBbaaitf68BBBBBBRPFT?!:::::::::     `.");
      console.log("!......YBBBBBBBBBBBBBBBBBBBRPFT?!::::::;:!^\"`;:::       `.");
      console.log("!........YBBBBBBBBBBRPFT?!::::::::::^''...::::::;         iBBbo.");
      console.log("`..........YBRPFT?!::::::::::::::::::::::::;iof68bo.      WBBBBbo.");
      console.log("  `..........:::::::::::::::::::::::;iof688888888888b.     `YBBBP^'");
      console.log("    `........::::::::::::::::;iof688888888888888888888b.     `");
      console.log("      `......:::::::::;iof688888888888888888888888888888b.");
      console.log("        `....:::;iof688888888888888888888888888888888899fT!");
      console.log("          `..::!8888888888888888888888888888888899fT|!^\"'");
      console.log("            `' !!988888888888888888888888899fT|!^\"");
      console.log("                `!!8888888888888888899fT|!^\"");
      console.log("                  `!988888888899fT|!^\"");
      console.log("                    `!9899fT|!^\"");
      console.log("                      `!^\"");
      
    })
    mongoose.connect(process.env.DATABASE_URL as string)
  }
}

export { DatabaseConfig }

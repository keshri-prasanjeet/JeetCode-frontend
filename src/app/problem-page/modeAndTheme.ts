export const modes = {
  'text/typescript': `console.log("Hello, Welcome to JeetCode!");

// Your code here
`,
  'text/x-java':
    `import java.util.*;

public class Main {
    public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      String userInput = scanner.nextLine();
      scanner.close();
      System.out.println("Hello, Welcome to JeetCode!");

        // Your Java code here
    }
}
`,
  'text/x-python': `print("Hello, Welcome to JeetCode!")`,
  'text/x-c++src': `#include <iostream>
using namespace std;
  int main() {
    cout << "Hello, Welcome to JeetCode!" << endl;

    // Your code here

    return 0;
}
`,
  'text/x-csrc': `#include <stdio.h>

int main() {
    printf("Hello, Welcome to JeetCode!\\n");

    // Your C code here

    return 0;
}
`,
};

export const themes = {
  'night':'night',
  'dracula':'dracula',
  'material':'material',
  'blackboard':'blackboard',
  'cobalt':'cobalt'
}

export const languages = {
  'text/typescript': 74,
  'text/x-java': 62,
  'text/x-python': 71,
  'text/x-c++src': 53,
  'text/x-csrc': 75
}

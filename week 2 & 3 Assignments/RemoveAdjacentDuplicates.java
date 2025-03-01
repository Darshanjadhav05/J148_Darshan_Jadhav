import java.util.Scanner;

public class RemoveAdjacentDuplicates {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
        System.out.print("Enter a string: ");
        String str = sc.next();
        
        char[] stack = new char[str.length()];
        int top = -1;

        for (char c : str.toCharArray()) {
            if (top >= 0 && stack[top] == c) {
                top--;
            } else {
                stack[++top] = c;
            }
        }

        System.out.print("String after removing adjacent duplicates: ");
        for (int i = 0; i <= top; i++) {
            System.out.print(stack[i]);
        }
	}

}

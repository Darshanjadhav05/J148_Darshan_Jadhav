import java.util.Scanner;

public class FindEvenNumbers {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
        System.out.print("Enter size of list: ");
        int n = sc.nextInt();
        int[] arr = new int[n];

        System.out.println("Enter elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.println("Even numbers in the list:");
        for (int num : arr) {
            if (num % 2 == 0) {
                System.out.print(num + " ");
            }
        }
	}

}

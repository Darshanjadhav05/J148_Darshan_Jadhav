import java.util.Scanner;

public class HighestNumbers {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
        System.out.print("Enter size of array: ");
        int n = sc.nextInt();
        int[] arr = new int[n];

        System.out.println("Enter elements:");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        int max1 = arr[0], max2 = arr[0];
        for (int num : arr) {
            if (num > max1) {
                max2 = max1;
                max1 = num;
            } 
            else if (num > max2 && num != max1) {
                max2 = num;
            }
        }

        System.out.println("Highest: " + max1);
        System.out.println("Second Highest: " + max2);

	}

}


class ArrayAverage {
    public static double average(int[] arr) {
        int sum = 0;
        for (int num : arr) sum += num;
        return (double) sum / arr.length;
    }
}

public class ArrayAverageMain {

	public static void main(String[] args) {
		int[] arr = {1, 2, 3, 4, 5};
        System.out.println("Average: " + ArrayAverage.average(arr));
	}

}

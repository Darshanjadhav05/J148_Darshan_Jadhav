
public class PrimeNumbers {

	public static void main(String[] args) {
		int n = 100;
	    for (int i = 2; i <= n; i++) {
	         if (isPrime(i)) {
	        	 System.out.print(i + " ");	        	 
	         }
	       }
	    }
	static boolean isPrime(int num) {
	    for (int i = 2; i <= Math.sqrt(num); i++) {
	         if (num % i == 0) 
	        	 return false;
	      }
	       return true;
	  }

}

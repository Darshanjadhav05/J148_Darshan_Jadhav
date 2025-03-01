
public class StringImmutable {

	public static void main(String[] args) {
		String str = "Hello";
        System.out.println("Original String: " + str);

        String modifiedStr = str.concat(" World");
        System.out.println("Modified String: " + modifiedStr);

        if (str == modifiedStr) {
            System.out.println("String is mutable");
        } else {
            System.out.println("String is immutable");
        }

	}

}

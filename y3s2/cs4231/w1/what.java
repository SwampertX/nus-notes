import java.util.Random;

public class MyThread extends Thread {
    int myId;
    Lock lock;
    Random r = new Random();

    public MyThread(int id, Lock lock) {
        myId = id;
        this.lock = lock;
    }

    void nonCriticalSection() {
        System.out.println(myId + " is not in CS");
        Util.mySleep(r.nextInt(1000));
    }
}

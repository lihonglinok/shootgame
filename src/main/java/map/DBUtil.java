package map;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.imageio.ImageIO;

/**
 * 数据库连接工具类
 * @author lihonglin
 *
 */
public class DBUtil {
	
	
	
	
	public static void main(String[] args) {
		
		BufferedImage img=new BufferedImage(470,470,BufferedImage.TYPE_3BYTE_BGR);
		
		Graphics g=img.getGraphics();
		g.setColor(Color.WHITE);
		g.fillRect(0, 0, 470, 470);
		g.setColor(Color.BLACK);
		int count=0;
		for(int i=5;i<42;i++) {
			for(int j=5;j<42;j++) {
				boolean b1 = i==5 && j>=5 && j<=11;
				boolean b2 = j==5 && i>=5 && i<=11;
				boolean b3 = j==11 && i>=5 && i<=11;
				boolean b4 = i==11 && j>=5 && j<=11;
				boolean b5 = i>=7 && i<=9 && j>=7 && j<=9;
				
				boolean b6 = i==5 && j>=35 && j<=41;
				boolean b7 = j==35 && i>=5 && i<=11;
				boolean b8 = j==41 && i>=5 && i<=11;
				boolean b9 = i==11 && j>=35 && j<=41;
				boolean b10 = i>=7 && i<=9 && j>=37 && j<=39;
				
				boolean b11 = j==5 && i>=35 && i<=41;
				boolean b12 = i==35 && j>=5 && j<=11;
				boolean b13 = i==41 && j>=5 && j<=11;
				boolean b14 = j==11 && i>=35 && i<=41;
				boolean b15 = j>=7 && j<=9 && i>=37 && i<=39;
				
				if(b1 || b2 || b3 || b4 || b5 ||
						b6 || b7 || b8 || b9 || b10
						|| b11 || b12 || b13 || b14 || b15) {
					g.fillRect(i*10, j*10, 10, 10);
				}else if(i>=5 && i<=12 && j>=5 && j<=12 ||
						i>=5 && i<=12 && j>=34 && j<=41 ||
						i>=34 && i<=41 && j>=5 && j<=12){
					
				}else {
					if(Math.random()>0.5) {
						g.fillRect(i*10, j*10, 10, 10);
					}
				}
				
			}
		}
		FileOutputStream fos=null;
		try {
			fos = new FileOutputStream("C:/Users/lihonglin/Desktop/images/1.png");
			ImageIO.write(img, "png", fos);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if(fos!=null) fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		System.out.println("over!"+count);
	}
}

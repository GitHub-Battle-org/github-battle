import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "@octokit/core";
import dayjs from "dayjs";

// レスポンスの型
export type Contributions = {
    data:{
        user:{
            ContoributionsCollection:{
                totalCommitContributions:number,
                contributionCalendar:{
                    weeks:{
                        contributionDays:{
                            weeks:[
                                {
                                    date:string,
                                    contributionLevel:number,
                                    contributionCount:number
                                }
                            ]
                        }
                    }
                }
        }
    }
  }
};
  

  
  // メインとなる関数
  export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
  ) {
    // リクエストのクエリをuserNameに代入
    const { userName } = request.query;
  
  // インスタンスを作成し、認証情報として環境変数に定義したGitHubトークンを渡す
    const octokit = new Octokit({
      auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
    });
  
    /**
     * クエリ部分
     * @param userName ユーザー名
     */
    const query = `
      query($userName:String!){
  user(login:$userName){
    contributionsCollection{
      totalCommitContributions
      contributionCalendar{
        weeks{
          contributionDays{
            date
            contributionLevel
            contributionCount
          }
        }
      }
    }
    `;
  
    // クエリとそれに必要な引数を渡し、octokitを使いデータを取得する
    const contributions = await octokit.graphql<Contributions>(query, {
      userName
    });
  
    console.log(contributions);
  }